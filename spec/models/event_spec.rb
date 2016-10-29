# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Event, type: :model do
  subject(:event) { build(:event) }

  before { Timecop.freeze }
  after { Timecop.return }

  it 'is valid' do
    expect(event).to be_valid
  end

  describe '#schedule' do
    subject(:schedule) { event.schedule }

    it 'is a single event' do
      expect(schedule.all_occurrences).to have_exactly(1).item
    end

    it 'is today for one hour' do
      expect(schedule.occurs_at?(Time.zone.now)).to be true
      expect(schedule.duration).to eq 1.hour
    end

    context 'with a schedule set' do
      subject(:event) { create(:event, :scheduled).tap(&:reload) }

      it 'is a repeating event' do
        expect(schedule).not_to be_terminating
      end

      it 'happens on a Friday at 9pm' do
        expect(schedule.occurs_at?(Time.zone.local(2016, 10, 28, 21)))
          .to be true
      end
    end
  end

  describe '#to_param' do
    subject(:param) { create(:event, name: 'A Bug Hunt').to_param }

    it 'uses the event name' do
      expect(param).to eq 'a-bug-hunt'
    end
  end
end
