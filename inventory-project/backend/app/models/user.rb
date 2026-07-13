class User < ApplicationRecord
  has_secure_password

  validates :user, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 6 }, on: :create

  # clave secreta única de tu app de Rails para firmar los tokens
  SECRET_KEY = Rails.application.credentials.secret_key_base

  def generate_token
    payload = {
      user_id: self.id,
      exp: 24.hours.from_now.to_i
    }

    JWT.encode(payload, SECRET_KEY)
  end

  def self.from_token(token)
    begin
      decoded = JWT.decode(token, SECRET_KEY)[0]

      find(decoded['user_id'])
    rescue JWT::DecodeError, JWT::ExpiredSignature, ActiveRecord::RecordNotFound
      nil
    end
  end

end
