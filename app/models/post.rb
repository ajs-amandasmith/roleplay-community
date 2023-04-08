class Post < ApplicationRecord
  has_one_attached :image

  belongs_to :character
  belongs_to :user
  has_many :comments
  has_many :post_tags
  has_many :tags, through: :post_tags

  validates :title, presence: true
  validates :character_id, presence: true
  validates :post, presence: true

  def acceptable_image
    return unless image.attached?

    unless image.blob.byte_size <= 1.megabyte
      errors.add(:image, "is too big")
    end

    acceptable_types = ["image/jpeg", "image/png"]
    unless acceptable_types.include?(image.content_type)
      errors.add(:image, "must be a JPEG or PNG")
    end
  end
end
