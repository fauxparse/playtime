# frozen_string_literal: true
class Invitation < ApplicationRecord
  belongs_to :sponsor, -> { includes(:team, :user) }, class_name: 'Member'
  belongs_to :member

  validates :sponsor_id, :member_id, :email, presence: true
  validates :email,
    email: { strict_mode: true, allow_blank: true }
  validate :ensure_same_team, if: %i(sponsor_id? member_id?)

  private

  def ensure_same_team
    errors.add(:member_id, :different_teams) \
      unless sponsor.team_id == member.team_id
  end
end
