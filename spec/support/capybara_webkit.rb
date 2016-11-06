# frozen_string_literal: true

require 'capybara/rspec'
require 'capybara/poltergeist'
require 'capybara-screenshot/rspec'

Capybara.default_wait_time = 8 # Seconds to wait before timeout error. Default is 2

# Register slightly larger than default window size...
Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, {
    debug: true, # change this to true to troubleshoot
    window_size: [1024, 768], # this can affect dynamic layout
    js_errors: true
  })
end
Capybara.javascript_driver = :poltergeist

Capybara::Screenshot.webkit_options = { width: 1024, height: 768 }
Capybara.save_path = ENV['CIRCLE_ARTIFACTS'] if ENV['CIRCLE_ARTIFACTS'].present?
