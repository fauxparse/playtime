# frozen_string_literal: true
class Team < ApplicationRecord
  include Sluggable
  sluggable

  has_many :members, -> { includes :user }
  has_many :events

  validates :name, :slug, presence: true

  def to_s
    name
  end
end
