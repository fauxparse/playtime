# frozen_string_literal: true
class Invitation < ApplicationRecord
  belongs_to :sponsor, -> { includes(:team, :user) }, class_name: 'Member'
  belongs_to :member
  has_one :team, through: :sponsor

  before_validation :generate_token, unless: :token?

  validates :sponsor_id, :member_id, :email, presence: true
  validates :email,
    email: { strict_mode: true, allow_blank: true }
  validates :token, presence: true, uniqueness: true
  validate :ensure_same_team, if: %i(sponsor_id? member_id?)

  def to_param
    token
  end

  private

  def ensure_same_team
    errors.add(:member_id, :different_teams) \
      unless sponsor.team_id == member.team_id
  end

  def generate_token
    while token.blank? ||
          Invitation.where(token: token).where.not(id: id).exists?
      self.token = SecureRandom.hex(32)
    end
  end
end
