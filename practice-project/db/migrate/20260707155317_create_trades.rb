class CreateTrades < ActiveRecord::Migration[8.1]
  def change
    create_table :trades do |t|
      t.string :name
      t.integer :price
      t.datetime :timestamp

      t.timestamps
    end
  end
end
