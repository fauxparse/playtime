# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Event, type: :model do
  subject(:event) { create(:event) }

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
      expect(schedule.occurs_at?(Time.zone.now.beginning_of_minute)).to be true
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

  describe '#occurrences' do
    subject(:occurrences) { event.occurrences }
    let(:start) { event.starts_at.to_date }
    let(:stop) { start + 1.month - 1.day }
    let(:bounded) { occurrences.between(start, stop) }

    context 'for a single event' do
      it 'has a size of 1' do
        expect(occurrences.size).to eq 1
      end

      it 'has one occurrence' do
        expect(bounded.first).to be_an_instance_of(Occurrence)
      end

      it 'starts at the right time' do
        expect(bounded.first.starts_at).to eq event.starts_at
      end

      describe '#between' do
        it 'takes a block' do
          list = []
          start = event.starts_at.to_date
          occurrences.between(start, start + 1.month - 1.day) do |occurrence|
            list << occurrence
          end
          expect(list).to have_exactly(1).item
        end
      end

      context 'when the occurrence has been saved' do
        before do
          event.occurrences.first.save
        end

        it 'uses the saved instance' do
          expect(event.reload.occurrences.first).to be_persisted
        end
      end
    end

    context 'for a repeating event' do
      let(:event) { create(:event, :scheduled) }

      it 'has a size of 1' do
        expect(occurrences.size).to eq BigDecimal::INFINITY
      end

      it 'has five occurrences' do
        expect(bounded).to have_exactly(5).items
      end

      context 'given times instead of dates' do
        let(:start) { event.starts_at.beginning_of_day }

        it 'still works' do
          expect(bounded).to have_exactly(5).items
        end
      end
    end
  end
end
