# frozen_string_literal: true
class Team < ApplicationRecord
  include Sluggable
  sluggable

  has_many :members, -> { includes :user }

  validates :name, :slug, presence: true
end
