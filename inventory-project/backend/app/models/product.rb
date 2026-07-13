class Product < ApplicationRecord
  has_many :purchase_orders, dependent: :destroy
  has_many :providers, through: :purchase_orders

  enum :status, { active: 0, discontinued: 1, low_stock: 2 }

  CATEGORIES = %w[electronics clothing food books premium furniture].freeze

  validates :name, :price, :stock, presence: true
  validates :price, numericality: { greater_than: 0}
  validates :category, presence: true, inclusion: { in: CATEGORIES }

  before_save :check_reorder_level

   # Scopes
   scope :by_category, ->(category) { where(category: category) if category.present? }
   scope :min_price, ->(price) { where('price >= ?', price) if price.present? }
   scope :max_price, ->(price) { where('price <= ?', price) if price.present? }
   scope :in_stock, ->(value) { where('stock > 0') if value == 'true' }
   scope :active_only, -> { where(active: true) }
   scope :low_stock, -> { where('stock <= reorder_level') }

   scope :filtered, ->(params) {
    by_category(params[:category])
      .min_price(params[:min_price])
      .max_price(params[:max_price])
      .in_stock(params[:in_stock])
      .active_only if params[:active_only] == 'true'
  }

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
