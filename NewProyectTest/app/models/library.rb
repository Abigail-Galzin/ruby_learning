
# Completa este código
class Library
  @@total_books = 0
  attr_accessor :name, :books

  def initialize(name)
    @name = name
    @books = []
    @@total_books += 1
  end

  # 1. Método de clase que devuelva @@total_books
  def self.total_libraries
    @@total_books
  end
  
  # 2. Método que agregue un libro usando self
  def add_book(book)
    self.books << book
  end
  
  # 3. Método que devuelva el nombre con self
  def library_info
    name
  end
end

# Prueba:
lib1 = Library.new("Central")
lib2 = Library.new("Norte")
puts Library.total_libraries # Debe mostrar 2

books = [
  { title: "El Hobbit", genre: "Fantasía", pages: 310, rating: 4.5 },
  { title: "Cien Años", genre: "Realismo", pages: 432, rating: 4.8 },
  { title: "Dune", genre: "Ciencia Ficción", pages: 412, rating: 4.2 },
  { title: "El Principito", genre: "Fábula", pages: 96, rating: 4.3 },
  { title: "Neuromante", genre: "Ciencia Ficción", pages: 320, rating: 4.0 }
]

# 1. Obtener todos los títulos (usando map)
titulos = books.map{ |book| book[:title]}

# 2. Libros de ciencia ficción (usando select)
sf_books = books.select{ |book| book[:genre] == "Ciencia Ficción"  }

# 3. Promedio de páginas (usando reduce)
avg_pages = books.reduce(0) { |sum, b| sum + b[:pages] } / books.length.to_f

# 4. Libros con rating > 4.3, ordenados por páginas descendente
high_rated = books.select{ |book| book[:rating] > 4.3}.sort_by { |b| -b[:pages] }

# 5. Agrupar por género (usando group_by)
by_genre = books.group_by{|book| book[:genre]}

puts titulos
puts sf_books
puts avg_pages
puts high_rated
puts by_genrai