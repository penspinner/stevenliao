const exampleArticle = {
  type_of: 'article',
  id: 161023,
  title: 'Jest for Sinon Stubs',
  description:
    'At work, we recently converted from Mocha, Karma, Chai, and Sinon to Jest. It was not immediately...',
  readable_publish_date: "Aug 25 '19",
  slug: 'jest-for-sinon-stubs-5bdb',
  path: '/2ezpz2plzme/jest-for-sinon-stubs-5bdb',
  url: 'https://dev.to/2ezpz2plzme/jest-for-sinon-stubs-5bdb',
  comments_count: 7,
  public_reactions_count: 9,
  collection_id: null,
  published_timestamp: '2019-08-25T06:02:15Z',
  positive_reactions_count: 9,
  cover_image: null,
  social_image: 'https://dev.to/social_previews/article/161023.png',
  canonical_url: 'https://dev.to/2ezpz2plzme/jest-for-sinon-stubs-5bdb',
  created_at: '2019-08-25T06:01:16Z',
  edited_at: null,
  crossposted_at: null,
  published_at: '2019-08-25T06:02:15Z',
  last_comment_at: '2022-08-24T17:42:26Z',
  reading_time_minutes: 1,
  tag_list: ['testing', 'javascript', 'jest', 'sinon'],
  tags: 'testing, javascript, jest, sinon',
  user: {
    name: 'Steven Liao',
    username: '2ezpz2plzme',
    twitter_username: '2ezpz2plzme',
    github_username: 'penspinner',
    user_id: 60637,
    website_url: null,
    profile_image:
      'https://res.cloudinary.com/practicaldev/image/fetch/s--XuOunzJA--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/60637/11a2c27f-a1e6-4956-86de-b14e35911e92.png',
    profile_image_90:
      'https://res.cloudinary.com/practicaldev/image/fetch/s--tUOahycP--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/60637/11a2c27f-a1e6-4956-86de-b14e35911e92.png',
  },
}

export type Article = typeof exampleArticle

export const getArticles = (options: { username: string; page?: string; per_page?: string }) => {
  const searchParams = new URLSearchParams(options).toString()
  return fetch(`https://dev.to/api/articles?${searchParams}`)
}
