class CreatePurchaseOrders < ActiveRecord::Migration[8.1]
  def change
    create_table :purchase_orders do |t|
      t.integer :quantity
      t.decimal :unit_price
      t.datetime :delivery_date

      t.timestamps
    end
  end
end
