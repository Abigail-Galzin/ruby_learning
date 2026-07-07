class Trade < ApplicationRecord
  def as_json(options = {})
    super(options).tap do |json|
      json["timestamp"] = (timestamp.to_f * 1000).to_i if timestamp.present?
    end
  end
end
