import * as React from 'react'
import { withRouter, Switch, Route } from 'react-router'
import { AuthRoute } from '../common/AuthRoute'
import { AdminTags } from './content/AdminTags'
import { AdminUsers } from './content/AdminUsers'
import { AuthWrapper } from 'src/components/Auth/AuthWrapper'
import { Link } from 'react-router-dom'
import Text from 'src/components/Text'
import Flex from 'src/components/Flex'
import { Box } from 'rebass'
import { inject, observer } from 'mobx-react'
import { AdminStore } from 'src/stores/Admin/admin.store'

interface IProps {}
interface IInjectedProps extends IProps {
  adminStore: AdminStore
}
@inject('adminStore')
@observer
class AdminPageClass extends React.Component<IProps, any> {
  componentDidMount() {
    this.injected.adminStore.init()
  }
  get injected() {
    return this.props as IInjectedProps
  }
  public render() {
    return (
      <div id="AdminPage">
        <Switch>
          <Route
            exact
            path="/admin"
            render={props => (
              <>
                <Text my={3}>
                  NOTE - This content is only viewable by admins
                </Text>
                <AuthWrapper roleRequired="admin">
                  <Flex>
                    <Box bg="white" p={2} m={2}>
                      <Link to="/admin/users">Users Admin</Link>
                    </Box>
                    <Box bg="white" p={2} m={2}>
                      <Link to="/admin/tags">Tags Admin</Link>
                    </Box>
                  </Flex>
                </AuthWrapper>
              </>
            )}
          />
          <AuthRoute
            path="/admin/tags"
            component={AdminTags}
            redirectPath="/admin"
            roleRequired="admin"
          />
          <AuthRoute
            path="/admin/users"
            component={AdminUsers}
            redirectPath="/admin"
            roleRequired="admin"
          />
        </Switch>
      </div>
    )
  }
}
export const AdminPage: any = withRouter(AdminPageClass as any)
