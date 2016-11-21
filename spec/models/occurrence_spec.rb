# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Occurrence, type: :model do
  subject(:occurrence) { event.occurrences.first }
  let(:event) { create(:event, :scheduled) }

  describe '#to_param' do
    it 'is the date' do
      expect(occurrence.to_param).to eq('2016-10-21')
    end
  end
end
