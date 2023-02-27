class User < ApplicationRecord
  has_secure_password

  has_one_attached :avatar

  has_many :characters
  has_many :posts
  has_many :comments
  
  validates :username, presence: true, uniqueness: true

  validate :acceptable_image

  def acceptable_image
    return unless avatar.attached?

    unless avatar.blob.byte_size <= 1.megabyte
      errors.add(:avatar, "is too big")
    end

    acceptable_types = ["image/jpeg", "image/png"]
    unless acceptable_types.include?(avatar.content_type)
      errors.add(:avatar, "must be a JPEG or PNG")
    end
  end
end
