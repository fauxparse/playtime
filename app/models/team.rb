# frozen_string_literal: true
class Team < ApplicationRecord
  include Sluggable
  sluggable

  has_many :members, -> { includes :user }
  has_many :events

  validates :name, :slug, presence: true

  scope :from_param, ->(param) { where(slug: param) }

  def to_s
    name
  end

  def time_zone
    Time.zone
  end
end
