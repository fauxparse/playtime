# frozen_string_literal: true
require 'rails_helper'

RSpec.describe TeamsController, type: :controller do
  describe 'GET #index' do
    it 'returns http success' do
      sign_in
      get :index
      expect(response).to have_http_status(:success)
    end
  end
end
