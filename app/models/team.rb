class Team < ApplicationRecord
  include Sluggable
  sluggable

  validates :name, :slug, presence: true
end
