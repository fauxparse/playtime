# frozen_string_literal: true
class Availability < ApplicationRecord
  belongs_to :member
  belongs_to :occurrence
  has_one :event, through: :occurrence

  validates :member_id, :occurrence_id, presence: true
  validates :available, inclusion: { in: [true, false] }
  validates :member_id, uniqueness: { scope: :occurrence_id }
end
