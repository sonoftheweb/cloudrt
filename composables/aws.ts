export const useAws = () => {
  const zones = ref<
    {
      name: string
      region: string
      endpoint: string[]
      protocols: string
    }[]
  >([
    {
      name: 'US East (Ohio)',
      region: 'us-east-2',
      endpoint: [
        'rds.us-east-2.amazonaws.com',
        'rds-fips.us-east-2.api.aws',
        'rds.us-east-2.api.aws',
        'rds-fips.us-east-2.amazonaws.com',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'US East (N. Virginia)',
      region: 'us-east-1',
      endpoint: [
        'rds.us-east-1.amazonaws.com',
        'rds-fips.us-east-1.api.aws',
        'rds-fips.us-east-1.amazonaws.com',
        'rds.us-east-1.api.aws',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'US West (N. California)',
      region: 'us-west-1',
      endpoint: [
        'rds.us-west-1.amazonaws.com',
        'rds.us-west-1.api.aws',
        'rds-fips.us-west-1.amazonaws.com',
        'rds-fips.us-west-1.api.aws',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'US West (Oregon)',
      region: 'us-west-2',
      endpoint: [
        'rds.us-west-2.amazonaws.com',
        'rds-fips.us-west-2.amazonaws.com',
        'rds.us-west-2.api.aws',
        'rds-fips.us-west-2.api.aws',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'Africa (Cape Town)',
      region: 'af-south-1',
      endpoint: ['rds.af-south-1.amazonaws.com', 'rds.af-south-1.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Asia Pacific (Hong Kong)',
      region: 'ap-east-1',
      endpoint: ['rds.ap-east-1.amazonaws.com', 'rds.ap-east-1.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Asia Pacific (Hyderabad)',
      region: 'ap-south-2',
      endpoint: ['rds.ap-south-2.amazonaws.com', 'rds.ap-south-2.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Asia Pacific (Jakarta)',
      region: 'ap-southeast-3',
      endpoint: [
        'rds.ap-southeast-3.amazonaws.com',
        'rds.ap-southeast-3.api.aws',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'Asia Pacific (Melbourne)',
      region: 'ap-southeast-4',
      endpoint: [
        'rds.ap-southeast-4.amazonaws.com',
        'rds.ap-southeast-4.api.aws',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'Asia Pacific (Mumbai)',
      region: 'ap-south-1',
      endpoint: ['rds.ap-south-1.amazonaws.com', 'rds.ap-south-1.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Asia Pacific (Osaka)',
      region: 'ap-northeast-3',
      endpoint: [
        'rds.ap-northeast-3.amazonaws.com',
        'rds.ap-northeast-3.api.aws',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'Asia Pacific (Seoul)',
      region: 'ap-northeast-2',
      endpoint: [
        'rds.ap-northeast-2.amazonaws.com',
        'rds.ap-northeast-2.api.aws',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'Asia Pacific (Singapore)',
      region: 'ap-southeast-1',
      endpoint: [
        'rds.ap-southeast-1.amazonaws.com',
        'rds.ap-southeast-1.api.aws',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'Asia Pacific (Sydney)',
      region: 'ap-southeast-2',
      endpoint: [
        'rds.ap-southeast-2.amazonaws.com',
        'rds.ap-southeast-2.api.aws',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'Asia Pacific (Tokyo)',
      region: 'ap-northeast-1',
      endpoint: [
        'rds.ap-northeast-1.amazonaws.com',
        'rds.ap-northeast-1.api.aws',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'Canada (Central)',
      region: 'ca-central-1',
      endpoint: [
        'rds.ca-central-1.amazonaws.com',
        'rds.ca-central-1.api.aws',
        'rds-fips.ca-central-1.api.aws',
        'rds-fips.ca-central-1.amazonaws.com',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'Canada West (Calgary)',
      region: 'ca-west-1',
      endpoint: [
        'rds.ca-west-1.amazonaws.com',
        'rds-fips.ca-west-1.amazonaws.com',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'Europe (Frankfurt)',
      region: 'eu-central-1',
      endpoint: ['rds.eu-central-1.amazonaws.com', 'rds.eu-central-1.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Europe (Ireland)',
      region: 'eu-west-1',
      endpoint: ['rds.eu-west-1.amazonaws.com', 'rds.eu-west-1.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Europe (London)',
      region: 'eu-west-2',
      endpoint: ['rds.eu-west-2.amazonaws.com', 'rds.eu-west-2.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Europe (Milan)',
      region: 'eu-south-1',
      endpoint: ['rds.eu-south-1.amazonaws.com', 'rds.eu-south-1.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Europe (Paris)',
      region: 'eu-west-3',
      endpoint: ['rds.eu-west-3.amazonaws.com', 'rds.eu-west-3.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Europe (Spain)',
      region: 'eu-south-2',
      endpoint: ['rds.eu-south-2.amazonaws.com', 'rds.eu-south-2.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Europe (Stockholm)',
      region: 'eu-north-1',
      endpoint: ['rds.eu-north-1.amazonaws.com', 'rds.eu-north-1.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Europe (Zurich)',
      region: 'eu-central-2',
      endpoint: ['rds.eu-central-2.amazonaws.com', 'rds.eu-central-2.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Israel (Tel Aviv)',
      region: 'il-central-1',
      endpoint: ['rds.il-central-1.amazonaws.com', 'rds.il-central-1.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Middle East (Bahrain)',
      region: 'me-south-1',
      endpoint: ['rds.me-south-1.amazonaws.com', 'rds.me-south-1.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'Middle East (UAE)',
      region: 'me-central-1',
      endpoint: ['rds.me-central-1.amazonaws.com', 'rds.me-central-1.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'South America (São Paulo)',
      region: 'sa-east-1',
      endpoint: ['rds.sa-east-1.amazonaws.com', 'rds.sa-east-1.api.aws'],
      protocols: 'HTTPS',
    },
    {
      name: 'AWS GovCloud (US-East)',
      region: 'us-gov-east-1',
      endpoint: [
        'rds.us-gov-east-1.amazonaws.com',
        'rds.us-gov-east-1.api.aws',
      ],
      protocols: 'HTTPS',
    },
    {
      name: 'AWS GovCloud (US-West)',
      region: 'us-gov-west-1',
      endpoint: [
        'rds.us-gov-west-1.amazonaws.com',
        'rds.us-gov-west-1.api.aws',
      ],
      protocols: 'HTTPS',
    },
  ])

  const zonesNamesArray = computed(() => {
    return zones.value.map(zone => zone.region)
  })

  const zonesNameRegionArray = computed(() => {
    return zones.value.map(zone => {
      return { name: zone.name, region: zone.region }
    })
  })

  return {
    zones,
    zonesNamesArray,
    zonesNameRegionArray,
  }
}
