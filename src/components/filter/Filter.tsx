import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import debounce from 'debounce';
import SearchInput from '../searchInput';
import { useTranslation } from 'react-i18next';

interface Props {
  handleSearch: (value: string) => void;
}
const Filter = (props: Props) => {
  const { t } = useTranslation();
  const onInputChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleSearch(event.target.value);
  }, 500);
  return (
    <div className="mb-10 flex flex-wrap justify-between gap-5">
      <div>
        <SearchInput className="min-w-80" placeholder={t('filter.search_placeholder')} onChange={onInputChange} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div>
          <Button variant="secondary" size="sm" className="w-32">
            {t('filter.title')}
          </Button>
        </div>
        <div>
          <Select>
            <SelectTrigger size="sm" className="w-32">
              <SelectValue placeholder="Asset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Asset</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger size="sm" className="w-32">
              <SelectValue placeholder="Asset Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Asset Class</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger size="sm" className="w-32">
              <SelectValue placeholder="Blockchain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Blockchain</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
