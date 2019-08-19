import express, { Request, Response } from 'express'
import Jimp from 'jimp'
import querystring from 'querystring'

const app = express()

app.get('/', function(req: Request, res: Response) {
  console.log('hitting route...')

  res.send('hello!')
})

app.get('/images/:imageID', async function(req: Request, res: Response) {
  const urlParams: any = req.params
  const queryParams = parseQueryParams(req.url)
  const jimpImage = await fetchImage(urlParams.imageID)

  res.setHeader('Content-Type', 'image/jpeg')

  if (queryParams.size === 0) {
    res.send(await jimpImage.getBufferAsync(Jimp.MIME_JPEG))
    return
  }

  const aspectRatio = jimpImage.bitmap.width / jimpImage.bitmap.height

  if (queryParams.has('format') && queryParams.get('format') === 'square') {
    const smallerDimension = Math.min(
      jimpImage.bitmap.width,
      jimpImage.bitmap.height
    )

    jimpImage.cover(
      smallerDimension,
      smallerDimension,
      Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
    )

    res.send(await jimpImage.getBufferAsync(Jimp.MIME_JPEG))
    return
  }

  if (queryParams.has('w') && queryParams.has('h')) {
    jimpImage.resize(<number>queryParams.get('w'), <number>queryParams.get('h'))

    res.send(await jimpImage.getBufferAsync(Jimp.MIME_JPEG))
    return
  }

  if (queryParams.has('h') && !queryParams.has('w')) {
    const [width, height] = resizeWidth(
      <number>queryParams.get('h'),
      aspectRatio
    )

    jimpImage.resize(width, height)
    res.send(await jimpImage.getBufferAsync(Jimp.MIME_JPEG))
    return
  }

  if (queryParams.has('w') && !queryParams.has('h')) {
    const [width, height] = resizeHeight(
      <number>queryParams.get('w'),
      aspectRatio
    )

    jimpImage.resize(width, height)
    res.send(await jimpImage.getBufferAsync(Jimp.MIME_JPEG))
    return
  }
})

export { app }

type QueryParams = Map<string, string | number>
interface QueryParamsObject {
  [key: string]: string
}

function parseQueryParams(url: string): QueryParams {
  let params: QueryParams = new Map()
  let paramsObject: QueryParamsObject = {}

  const queryIndex = url.indexOf('?')

  if (queryIndex >= 0) {
    const query = url.substr(queryIndex + 1)
    paramsObject = <QueryParamsObject>querystring.parse(query)
  }

  if (paramsObject) {
    Object.entries(paramsObject).forEach(function(value: [string, string]) {
      if (Number.isNaN(parseInt(value[1]))) {
        params.set(value[0], value[1])
      }

      params.set(value[0], parseInt(value[1]))
    })
  }

  return params
}

async function fetchImage(id: string): Promise<Jimp> {
  const awsURL = 'https://s3-us-west-2.amazonaws.com/makersdistillery/1000x/'
  const formattedURL = `${awsURL}${id}.jpg`
  return Jimp.read(formattedURL)
}

function resizeWidth(height: number, aspectRatio: number): [number, number] {
  return [height, height * aspectRatio]
}

function resizeHeight(width: number, aspectRatio: number): [number, number] {
  return [width / aspectRatio, width]
}
