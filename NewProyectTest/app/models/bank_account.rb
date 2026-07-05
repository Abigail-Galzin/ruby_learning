class BankAccount < ApplicationRecord
  attr_accessor :balance

  def initialize(balance_inicial)
    @balance = balance_inicial
  end

  def add_balance
    @balance += 10
  end

  def has_funds?
    puts balance > 0
  end
end


class BookManager
  def initialize
    @books = []
  end
  
  def add_book(title, author)
    @books << { title: title, author: author, added_at: Time.now }
  end
  
  # 1. Método que itera y YIELD cada libro
  def each_book
    @books.each do |current_book|
      yield(current_book) # <- "Asomamos" el libro por la ventanilla
    end
  end
  
  # 2. Método que filtra con bloque
  def find_books
    # Escribe aquí - debe yield y devolver los que cumplen
    @books.select do |book|
      yield(book)
    end
  end
  
  # 3. Método que cuenta con bloque
  def count_books
    # Escribe aquí - cuenta los libros que cumplen con el yield
    @books.count { |book| yield(book) }
  end
end

# Prueba:
manager = BookManager.new
manager.add_book("Ruby", "Matz")
manager.add_book("Rails", "DHH")

# Debe imprimir cada libro
manager.each_book { |book| puts book[:title] } 

# Debe mostrar 1 libro (el de Ruby)
puts manager.count_books { |book| book[:title] == "Ruby" }



fantasy_books = # Escribe aquí

# 2. Libros con más de 300 páginas, ordenados por título
long_books = # Escribe aquí

# 3. Autores con al menos 5 libros (usando asociaciones)
popular_authors = # Escribe aquí

# 4. Rating promedio de un libro (usando asociación)
book = Book.find(1)
avg_rating = # Escribe aquí

# 5. Libros con reviews de 4 estrellas o más
highly_rated_books = # Escribe aquí (usa joins)