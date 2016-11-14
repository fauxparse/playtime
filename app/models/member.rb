# frozen_string_literal: true
class Member < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :team

  auto_strip_attributes :name

  validates :name, :team_id, presence: :true
  validates :user_id,
    uniqueness: { scope: :team_id },
    if: :user_id?
  validates :admin, absence: true, unless: :user_id?

  scope :with_team_id, ->(param) { joins(:team).merge(Team.from_param(param)) }

  def to_s
    name
  end

  def email
    user.try(:email)
  end

  def email?
    email.present?
  end
end
