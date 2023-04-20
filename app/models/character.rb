class Character < ApplicationRecord
  has_one_attached :avatar

  belongs_to :user

  has_many :posts, :dependent => :destroy
  has_many :comments, :dependent => :destroy

  validates :name, presence: true
  validates_uniqueness_of :name, scope: :user_id

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
