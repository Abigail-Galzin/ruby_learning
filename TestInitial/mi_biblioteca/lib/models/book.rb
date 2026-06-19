
class Book
  attr_accessor :title
  attr_accessor :autor
  attr_accessor :pages
  attr_accessor :genre

  def initialize(title, autor, pages, genre)
    @title = title
    @autor = autor
    @pages = pages
    @genre = genre
  end

  def summary
    "This book has tdhe #{title}"
  end

end