require 'csv'

module LibraryImporter
  class CSVLoader
    attr_reader :path

    def initialize(path)
      @path = path
    end

    def load
      books = CSV.read(@path)
      books.each do |book|
        new_book = Book.new(book[0], book[1], book[2], book[3])

        yield(new_book) if block_given?
      end
    end

  end
end
