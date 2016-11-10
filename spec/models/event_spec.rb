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

      it 'caches its repeat end time' do
        expect(event.stops_repeating_at).to be_nil
      end

      context 'with an end date' do
        subject(:event) { create(:event, :terminating).tap(&:reload) }

        it 'terminates' do
          expect(schedule).to be_terminating
        end

        it 'has 6 occurrences' do
          expect(schedule.all_occurrences).to have_exactly(6).items
        end

        it 'caches its repeat end time' do
          expect(event.stops_repeating_at)
            .to eq event.starts_at + 5.weeks + 1.hour
        end
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
