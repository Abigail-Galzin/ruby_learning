class CreateLibraries < ActiveRecord::Migration[8.1]
  def change
    create_table :libraries do |t|
      t.string :name
      t.json :books, default: []

      t.timestamps
    end
  end
end
