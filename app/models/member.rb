class Member < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :team

  validates :team_id, presence: :true
  validates :user_id,
    uniqueness: { scope: :team_id },
    if: :user_id
  validates :admin, absence: true, unless: :user_id?
end
