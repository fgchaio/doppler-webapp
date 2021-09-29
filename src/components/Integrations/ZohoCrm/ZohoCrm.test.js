import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ZohoCrm } from './ZohoCrm';
import IntlProvider from '../../../i18n/DopplerIntlProvider.double-with-ids-as-values';


describe('Test Zoho CRM component', () => {
  it('render Zoho page', async () => {
    const texts = [
      'zoho_crm.promotional_title',
      'zoho_crm.promotional_description',
      'zoho_crm.promotional_ul_item_subscribers',
      'zoho_crm.promotional_ul_item_mapping',
      'zoho_crm.promotional_ul_item_syncing',
      'zoho_crm.promotional_paragraph_strong'
    ];

    render(
      <IntlProvider>
        <ZohoCrm />
      </IntlProvider>
    );

    texts.map((text) => expect(screen.getByText(text)).toBeInTheDocument());
  });
});
