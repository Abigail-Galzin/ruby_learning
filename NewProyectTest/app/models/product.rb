class Product < ApplicationRecord
  @@total_count = []

  after_initialize :add_to_count

  def self.cheap_items
    puts "searching cheap items"
  end


  def self.display_total
    puts @@total_count.length
  end

  def add_to_count
    @@total_count << self
  end

end
