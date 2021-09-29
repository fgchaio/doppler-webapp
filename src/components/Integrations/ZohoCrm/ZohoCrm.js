import React from 'react';
import { Promotional } from '../../shared/Promotional/Promotional';
import { useIntl } from 'react-intl';
import dataStudioGif from '../BigQuery/google-data-studio.gif';
import bigQueryLogo from './zoho-icon.png';

export const ZohoCrm = () => {
  const intl = useIntl();
  const _ = (id, values) => intl.formatMessage({ id: id }, values);

  return (
    <Promotional
      title={_('zoho_crm.promotional_title')}
      description={_('zoho_crm.promotional_description')}
      features={[
        _('zoho_crm.promotional_ul_item_subscribers'),
        _('zoho_crm.promotional_ul_item_mapping'),
        _('zoho_crm.promotional_ul_item_syncing'),
      ]}
      paragraph={_('zoho_crm.promotional_paragraph_strong')}
      actionText={_('zoho_crm.promotional_btn_redirect').toUpperCase()}
      actionUrl={_('zoho_crm.promotional_upgrade_plan_url')}
      logoUrl={bigQueryLogo}
      previewUrl={dataStudioGif}
    />
  );
};
