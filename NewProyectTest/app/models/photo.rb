class Photo < ApplicationRecord
  has_one_attached :image

  validates :caption, presence: { message: "caption can't be blank" }

  validate :validate_caption_size
  validate :validate_attached_presence
  validate :validate_image_type
  validate :validate_image_size

  def as_json
    {
      id: id,
      caption: caption,
      image: image.attached? ? avatar_path : nil
    }
  end

  def created_json
    {
      id: id,
      caption: caption,
      image: image.attached? ? "#{id}.#{image_type}" : nil
    }
  end


  def validate_caption_size
    errors.add('caption too large') unless caption.length <= 100
  end
  
  def validate_attached_presence
    errors.add('image should be present') unless image.attached?
  end

  def validate_image_size
    if image.blob.byte_size > 200.kilobytes
      errors.add('File too lareg')
    end
  end

  def validate_image_type
    unless image.content_type.in?(%w[image/jpeg image/jpg image/png])
      errors.add('bad tupe')
    end
  end

  def avatar_path
    return nil unless image.attached?

    # Una sola línea directa de Active Record
    Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
  end

  def image_type
    image.content_type
  end

end
