'use client';

import {NextIntlClientProvider} from 'next-intl';

type Props = React.ComponentProps<typeof NextIntlClientProvider>;

export function IntlProviderWrapper(props: Props) {
  return (
    <NextIntlClientProvider
      {...props}
      onError={(error) => {
        if (error.code === 'MISSING_MESSAGE') return;
        // Optionally log other errors
        // console.error(error);
      }}
    />
  );
}