import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { camelCaseFormatter } from '@/lib/utils';
import { privatePaths } from '@/routes/client-paths';
import type { FC } from 'react';
import { Fragment, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  /**
   * @param customRoutes - Custom routes to be used in the breadcrumb
   * @description should be a string with the routes separated by '/'
   * @example '/root/page1/page2'
   */
  customRoutes?: string;
};

const MyBreadCrumb: FC<Props> = ({ customRoutes }) => {
  const location = useLocation();
  const capitalizeFirstLetter = useCallback((string_: string) => {
    return string_
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, []);
  const items = customRoutes ? customRoutes.split('/') : location.pathname.split('/');
  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        {items.map((item, index) => {
          if (!item) {
            return null;
          }
          const path = camelCaseFormatter(item);
          if (index === items.length - 1) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{capitalizeFirstLetter(item)}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  {/* @ts-expect-error typescript doesn't know about app client paths */}
                  <Link className="text-primary hover:text-primary-hover" to={privatePaths?.[path]}>
                    {capitalizeFirstLetter(item)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default MyBreadCrumb;
