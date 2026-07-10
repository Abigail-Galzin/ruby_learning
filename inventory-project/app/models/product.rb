class Product < ApplicationRecord
  has_many :purchase_orders, dependent: :destroy
  has_many :providers, through: :purchase_orders

  enum :status, { active: 0, discontinued: 1, low_stock: 2 }

  CATEGORIES = %w[electronics clothing food books premium furniture].freeze

  validates :name, :price, presence: true
  validates :price, numericality: { greater_than: 0}
  validates :category, presence: true, inclusion: { in: CATEGORIES }

  before_save :check_reorder_level

  def check_reorder_level
    return unless stock.present? && reorder_level.present?

    if stock <= reorder_level
      self.status = :low_stock
    end
  end

  def self.premium_category
    "premium"
  end

  def sell_product(quantity)
    puts quantity
    puts discontinued?
    if discontinued?
      errors.add(:base, "Discontinued product")
      return false
    end

    if available_quantity(quantity)
      self.stock -= quantity

      if save
        check_reorder_level
        true
      else
        false
      end
    end
  end

  def available_quantity(quantity)
    puts quantity > stock
    if quantity > stock
      errors.add(:stock, "Not enough stock")
      return false
    else
      return true
    end
  end
end
