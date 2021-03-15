import { expect } from 'chai';
import store from '@/store';
import { mockAxios } from '../setup';
import { ruleYaml } from '../mockData/ruleData.js';

mockAxios.onGet('/api/rules/test123').reply(200, { yaml: ruleYaml });

describe('YAML parsing', () => {
  it('renders the correct yaml', async () => {
    await store.dispatch('config/load', { type: 'rules', path: 'test123' });

    let yaml = store.getters['config/yaml']();

    let expected = `__praeco_full_path: test123
__praeco_query_builder: "{\\"query\\":{\\"logicalOperator\\":\\"all\\",\\"children\\":[]}}"
alert:
  - slack
alert_subject: this is a test subject
alert_subject_args: []
alert_text: this is a test body
alert_text_args: []
alert_text_type: alert_text_only
doc_type: syslog
filter:
  - query:
      query_string:
        query: "@timestamp:*"
generate_kibana_discover_url: false
import: BaseRule.config
index: hannibal-*
is_enabled: false
name: test123
num_events: 10000
realert:
  minutes: 5
slack_attach_kibana_discover_url: false
slack_channel_override: "#elastalert-debugging"
slack_kibana_discover_color: "#ec4b98"
slack_kibana_discover_title: Discover in Kibana
slack_msg_color: danger
slack_title_link: undefined/rules/test123
slack_username_override: Praeco
terms_size: 50
timeframe:
  minutes: 5
timestamp_field: "@timestamp"
timestamp_type: iso
type: frequency
use_count_query: true
use_strftime_index: false
`;

    return expect(yaml).to.equal(expected);
  });
});
