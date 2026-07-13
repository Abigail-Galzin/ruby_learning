class AddUserIdToPurchaseOrders < ActiveRecord::Migration[8.1]
  def change
    add_reference :purchase_orders, :user, foreign_key: true
  end
end
