module WikiPostsHelper
  def self.create_wiki_post(params)
    WikiPost.create!(
      title: params[:title],
      description: params[:description],
      author: params[:author]
    )
  end
end
