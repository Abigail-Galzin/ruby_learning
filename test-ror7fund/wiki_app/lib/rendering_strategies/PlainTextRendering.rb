module RenderingStrategies
  class PlainTextRendering
    include RenderingStrategy
    def render(wiki_post)
      "Title: #{wiki_post.title}"
    end
  end
end