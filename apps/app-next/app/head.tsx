import { indexDescription, indexTitle } from 'personal-site'

const Head = () => {
  return (
    <>
      <title>{indexTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={indexDescription} />
    </>
  )
}

export default Head
