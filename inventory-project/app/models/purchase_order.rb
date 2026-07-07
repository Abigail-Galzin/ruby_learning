class PurchaseOrder < ApplicationRecord
  belongs_to :product
  belongs_to :provider

  validates :quantity, numerically: { only_integer: true, greater_than: 0 }
  validate :valid_product

  def valid_product
    unless product.active
      errors.add(:product, "Product Discontinued")
    end
  end
end
