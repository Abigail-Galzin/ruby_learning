include Person
class Author
  attr_accessor :first_name
  attr_accessor :last_name
  attr_accessor :nationality
  @@authors = []

  def initialize(first_name, last_name, nationality)
    @first_name = first_name
    @last_name = last_name
    @nationality = nationality

    @@authors << self
  end

  def self.find_or_create(first_name, last_name, nationality)
    existing_author = @@authors.find do |author|
      author.first_name == first_name && author.last_name == last_name
    end

    existing_author || Author.new(first_name, last_name, nationality)
  end

end