class Product < ApplicationRecord
  has_one_attached :hero_image, dependent: :purgue_later
  has_many_attached :gallery_images

  validates :name, presence: true,
    length: { minimum: 3 , maximum: 50},
    uniqueness: { case_sensitive: false }

  validates :price, presence: true,
    numericality: { greater_than: 0.00, allow_nil: true }

  validate :validate_all_images

  before_validation :case_sensitive_name
  after_save :change_file_name

  def serialize_as_json
    {
      id: id,
      name: name,
      hero_image_url: hero_image.attached? ? Rails.application.routes.url_helpers.rails_blob_path(hero_image.variant(resize_to_limit: [300, 300])) : nil,
      gallery_images: serialize_gallery
    }
  end

  def serialize_gallery
    #return [] unless gallery_images.attached?

    gallery_images.map do |image|
      { image_url: Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true) }
    end
  end

  def validate_all_images
    validate_image_presence(hero_image, :hero_image)
    validate_image_size(hero_image, :hero_image)
    validate_image_type(hero_image, :hero_image)
    validate_gallery
  end

  def change_file_name
    hero_image.filename = "product_#{id}.file"
  end

  def case_sensitive_name
    name.downcase
  end

  def validate_image_size(image, attribute_name)
    return unless image.respond_to?(:attached?) && image.attached?

    if image.blob.byte_size > 300.kilobytes
      errors.add(attribute_name, "file too big > 300")
    end
  end

  def validate_image_presence(image, attribute_name)
    errors.add(attribute_name, "#{attribute_name} can't be blank") unless image.respond_to?(:attached?) && image.attached?
  end

  def validate_image_type(image, attribute_name)
    return unless image.respond_to?(:attached?) && image.attached?

    unless image.content_type.in?(['image/jpg', 'image/png', 'image/jpeg'])
      errors.add(attribute_name, "Wrong file type")
    end
  end

  def validate_gallery
    return unless gallery_images.respond_to?(:attached?) && gallery_images.attached?

    if gallery_images.count > 5 && gallery_images.count < 1
      errors.add(:gallery_images, "The max images added is 5")
    end

    gallery_images.each do |image|
      validate_image_size(image, :gallery_images)
      validate_image_type(image, :gallery_images)
    end
  end

end
