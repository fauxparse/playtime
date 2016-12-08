# frozen_string_literal: true
class Occurrence < ApplicationRecord
  belongs_to :event
  has_many :availabilities, dependent: :destroy

  validates :event_id, presence: true
  validates :starts_at, presence: true, uniqueness: { scope: :event_id }

  scope :for_event, -> (event) { where(event: event).includes(:event) }
  scope :ordered, -> { order(starts_at: :asc) }

  def to_param
    @param ||= Time.use_zone(event.time_zone) { starts_at.to_date.to_param }
  end

  def ends_at
    starts_at + event.duration
  end

  def self.between(start_time, end_time)
    ordered.where(
      ':start <= starts_at AND starts_at <= :end',
      start: start_time,
      end: end_time
    )
  end
end
