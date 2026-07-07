module RenderingStrategies
  module RenderingStrategy
    def render(wiki_post)
      raise NotImplementedError, 'Subclass must implement the render method '
    end
  end
end