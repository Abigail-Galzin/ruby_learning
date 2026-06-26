class AddReference < ActiveRecord::Migration[8.1]
  def change
    add_reference :employees, :position, foreign_key: true
  end
end
