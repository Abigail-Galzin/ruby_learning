class User < ApplicationRecord
  has_one_attached :avatar

  validates :username, presence: { message: "Username can't be blank" }

  validate :validate_avatar_presence
  validate :validate_avatar_size
  validate :validate_avatar_type

  def saludar
    puts "Hi my username is #{@username}"
  end

  def format_name
    self.username = @username.upcase
  end

  def validate_avatar_presence
    errors.add(:avatar, "Avatar can't be blank") unless avatar.attached?
  end

  def validate_avatar_type
    return unless avatar.attached?

    unless avatar.content_type.in?(%w[image/jpeg image/jpg image/png])
      errors.add(:avatar, "Avatar must be a JPG or PNG file")
    end
  end

  def validate_avatar_size
    return unless avatar.attached?

    if avatar.blob.byte_size > 20.kilobytes
      errors.add(:avatar, "Avatar must be less than 20KB")
    end
  end

end
