# frozen_string_literal: true
require 'codeclimate-test-reporter'
CodeClimate::TestReporter.start

if ENV['CIRCLE_ARTIFACTS']
  dir = File.join(ENV['CIRCLE_ARTIFACTS'], 'coverage')
  SimpleCov.coverage_dir(dir)
end

SimpleCov.add_filter do |src_file|
  File.readlines(src_file.filename).size <= 5
end

SimpleCov.add_group 'Services' do |src_file|
  src_file.filename =~ /^#{Rails.root.join('app', 'services')}/
end

SimpleCov.start 'rails'

require 'webmock/rspec'

# http://rubydoc.info/gems/rspec-core/RSpec/Core/Configuration
RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.syntax = :expect
  end

  config.mock_with :rspec do |mocks|
    mocks.syntax = :expect
    mocks.verify_partial_doubles = true
  end

  config.example_status_persistence_file_path = 'tmp/rspec_examples.txt'
  config.order = :random
end

WebMock.disable_net_connect!(allow_localhost: true)
